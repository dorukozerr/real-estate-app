"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { createProperty, updateProperty, deleteProperty } from "@/actions";
import { Property } from "@/types";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed`);
  }
};

const initialPropertyData = {
  title: "",
  price: 0,
  location: "",
  imageUrls: [],
  description: "",
  isFeatured: false,
  isForRent: false,
};

export const AdminPropertyList = ({
  initialProperties,
}: {
  initialProperties: Property[];
}) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [property, setProperty] =
    useState<Partial<Property>>(initialPropertyData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      const { _id, ...body } = property;
      await updateProperty(isEditing, body);
    } else {
      await createProperty(property as Omit<Property, "_id" | "createdAt">);
    }

    setProperty(initialPropertyData);
  };

  const handleDelete = async (id: string) => {
    await deleteProperty(id);
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={property.title}
          onChange={(e) => setProperty({ ...property, title: e.target.value })}
          className="w-full rounded border p-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={property.price}
          onChange={(e) =>
            setProperty({
              ...property,
              price: e.target.value as unknown as number,
            })
          }
          className="w-full rounded border p-2"
        />
        <input
          type="text"
          placeholder="Location"
          value={property.location}
          onChange={(e) =>
            setProperty({ ...property, location: e.target.value })
          }
          className="w-full rounded border p-2"
        />
        <textarea
          placeholder="Description"
          value={property.description}
          onChange={(e) =>
            setProperty({ ...property, description: e.target.value })
          }
          className="w-full rounded border p-2"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={property.isForRent}
            onChange={(e) =>
              setProperty({ ...property, isForRent: e.target.checked })
            }
          />
          <span>Is For Rent?</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={property.isFeatured}
            onChange={(e) =>
              setProperty({ ...property, isFeatured: e.target.checked })
            }
          />
          <span>Featured</span>
        </label>
        <ImageKitProvider
          urlEndpoint={urlEndpoint}
          publicKey={publicKey}
          authenticator={authenticator}
        >
          <div>
            <IKUpload
              onError={(err) => console.error("Image Upload Error =>", err)}
              onSuccess={(res) => {
                console.log("Image Upload Success =>", res);
                setProperty((prevState) => ({
                  ...prevState,
                  imageUrls: [
                    ...(prevState.imageUrls as Array<string>),
                    res.url,
                  ],
                }));
              }}
            />
          </div>
        </ImageKitProvider>
        <div className="flex h-max w-full items-center justify-start gap-4 rounded-md border p-4">
          {property &&
            property.imageUrls &&
            property.imageUrls.map((img, index) => (
              <Image
                width={100}
                height={100}
                src={img}
                alt="Portfolio Image"
                key={`ìmage-${index}`}
              />
            ))}
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          {isEditing ? "Update Property" : "Add Property"}
        </button>
      </form>
      <div className="space-y-4">
        {initialProperties?.map((p) => (
          <div key={p?._id} className="rounded border p-4">
            <h3 className="text-xl font-bold">{p.title}</h3>
            <p>₺{p?.price.toLocaleString()}</p>
            <p>{p?.location}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => {
                  setIsEditing(p?._id ? p._id : "");
                  setProperty(p);
                }}
                className="rounded bg-yellow-500 px-4 py-2 text-white"
              >
                Edit
              </button>
              <button
                onClick={() => p?._id && handleDelete(p?._id)}
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
