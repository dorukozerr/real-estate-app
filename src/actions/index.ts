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
  revalidatePath("/admin/properties");
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
  revalidatePath("/admin/properties");
  return result;
};

export const deleteProperty = async (id: string) => {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  revalidatePath("/");
  revalidatePath("/admin/properties");
  return result;
};
