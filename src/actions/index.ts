"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Property } from "@/types";
import { ObjectId } from "mongodb";
import { compare } from "bcryptjs";
import { verify, sign } from "jsonwebtoken";
import clientPromise from "@/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}

export const checkAuth = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin-token");

    if (!token) {
      return false;
    }

    verify(token.value, JWT_SECRET);

    return true;
  } catch {
    return false;
  }
};

const getCollection = async (collectionName: string) =>
  (await clientPromise).db("real-estate").collection(collectionName);

export const getProperty = async (id: string) =>
  (await getCollection("properties")).findOne({ _id: new ObjectId(id) });

export const getProperties = async ({
  mode,
  page = 1,
  size = 9,
}: {
  mode: "all" | "rent" | "sale";
  page?: number;
  size?: number;
}) => {
  const collection = await getCollection("properties");

  if (mode === "all") {
    return collection.find().sort({ createdAt: -1 }).toArray();
  }

  const skip = (page - 1) * size;

  const total = await collection.countDocuments({
    isForRent: mode === "rent" ? true : false,
  });

  const properties = await collection
    .find({ isForRent: mode === "rent" ? true : false })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(size)
    .toArray();

  const totalPages = Math.ceil(total / size);

  revalidatePath("/listing");

  return {
    listings: properties,
    total,
    totalPages,
    hasMore: page < totalPages,
  };
};

export const createProperty = async (
  property: Omit<Property, "_id" | "createdAt">
) => {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    throw new Error("Not Authenticated");
  }

  const result = await (
    await getCollection("properties")
  ).insertOne({
    ...property,
    createdAt: new Date(),
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/listing");
  revalidatePath(`/property/${result.insertedId}`);

  return result;
};

export const updateProperty = async (
  id: string,
  property: Partial<Property>
) => {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    throw new Error("Not Authenticated");
  }

  const result = await (
    await getCollection("properties")
  ).updateOne({ _id: new ObjectId(id) }, { $set: property });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/listing");
  revalidatePath(`/property/${id}`);

  return result;
};

export const deleteProperty = async (id: string) => {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    throw new Error("Not Authenticated");
  }

  const result = await (
    await getCollection("properties")
  ).deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/listing");
  revalidatePath(`/property/${id}`);

  return result;
};

export const populateProperties = async () => {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    throw new Error("Not Authenticated");
  }

  const collection = await getCollection("properties");

  const results = [];

  for (let i = 0; i < 50; i++) {
    const data = {
      title: `Test Title ${i + 1}`,
      price: 100 * i,
      location: `Test Location ${i + 1}`,
      imageUrls: [
        "https://ik.imagekit.io/huepk67st/rep1_GhQZtQbGd.jpg",
        "https://ik.imagekit.io/huepk67st/rep2_3KxdD6vOO.jpg",
        "https://ik.imagekit.io/huepk67st/rep3_ti58DK7U0.jpg",
        "https://ik.imagekit.io/huepk67st/rep4_tL17xdFRd.jpg",
        "https://ik.imagekit.io/huepk67st/rep6_s7DvlQNSb.jpg",
      ],
      description:
        "- Test Description 1\n- Test Description 2\n- Test Description 3\n- Test Description 5\n- Test Description 6\n- Test Description 7",
      isFeatured: true,
      isForRent: Math.random() > 0.5 ? true : false,
      roomCount: "2+1",
      tags: ["test tag 1", "test tag 2", "test tag 3", "test tag 4"],
    };

    const result = await collection.insertOne({
      ...data,
      createdAt: new Date(),
    });

    results.push(result);
  }

  revalidatePath("/");
  revalidatePath("/listing");
  revalidatePath("/admin");

  return results;
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await (await getCollection("admins")).findOne({ username });

  if (!user) {
    return false;
  }

  const doesPasswordsMatch = await compare(password, user.password);

  if (!doesPasswordsMatch) {
    return false;
  }

  cookies().set({
    name: "admin-token",
    value: sign({ username }, JWT_SECRET, { expiresIn: "24h" }),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  revalidatePath("/admin");

  return true;
};

export const logout = async () => {
  const isAuthenticated = await checkAuth();

  if (!isAuthenticated) {
    throw new Error("Not Authenticated");
  }

  cookies().set({
    name: "admin-token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  });

  revalidatePath("/admin");
};
