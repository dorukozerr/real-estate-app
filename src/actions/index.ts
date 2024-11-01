"use server";

import { revalidatePath } from "next/cache";
import clientPromise from "@/lib/mongodb";
import { Property } from "@/types";
import { ObjectId } from "mongodb";

export async function getProperties() {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  return collection.find().sort({ createdAt: -1 }).toArray();
}

export async function getFeaturedProperties() {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  return collection
    .find({ isFeatured: true })
    .sort({ createdAt: -1 })
    .toArray();
}

export async function createProperty(
  property: Omit<Property, "_id" | "createdAt">
) {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  const result = await collection.insertOne({
    ...property,
    createdAt: new Date(),
  });
  revalidatePath("/");
  revalidatePath("/admin/properties");
  return result;
}

export async function updateProperty(id: string, property: Partial<Property>) {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: property }
  );
  revalidatePath("/");
  revalidatePath("/admin/properties");
  return result;
}

export async function deleteProperty(id: string) {
  const client = await clientPromise;
  const collection = client.db("real-estate").collection("properties");
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  revalidatePath("/");
  revalidatePath("/admin/properties");
  return result;
}
