"use server";

import { revalidatePath } from "next/cache";
import clientPromise from "@/lib/mongodb";
import { Property } from "@/types";
import { ObjectId } from "mongodb";

export const getProperties = async () => {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  return collection.find().sort({ createdAt: -1 }).toArray();
};

export const getFeaturedProperties = async () => {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  return collection
    .find({ isFeatured: true })
    .sort({ createdAt: -1 })
    .toArray();
};

export const getPropertiesForRent = async () => {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  return collection.find({ isForRent: true }).sort({ createdAt: -1 }).toArray();
};

export const getPropertiesForSale = async () => {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  return collection
    .find({ isForRent: false })
    .sort({ createdAt: -1 })
    .toArray();
};

export const createProperty = async (
  property: Omit<Property, "_id" | "createdAt">
) => {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  const result = await collection.insertOne({
    ...property,
    createdAt: new Date(),
  });
  revalidatePath("/");
  revalidatePath("/admin");
  return result;
};

export const updateProperty = async (
  id: string,
  property: Partial<Property>
) => {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: property }
  );
  revalidatePath("/");
  revalidatePath("/admin");
  return result;
};

export const deleteProperty = async (id: string) => {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  revalidatePath("/");
  revalidatePath("/admin");
  return result;
};

export const populateProperties = async () => {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  const results = [];
  for (let i = 0; i < 50; i++) {
    const data = {
      title: `Test Title ${i + 1}`,
      price: 2500,
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
      isFeatured: Math.random() > 0.5 ? true : false,
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
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("admins");
  const user = await collection.findOne({ username });
  // TODO - Add some security cookie here and also add some auth middleware to update, create, delete, populate routes
  if (!user) {
    return false;
  }
  if (user.password !== password) {
    return false;
  }
  return true;
};
