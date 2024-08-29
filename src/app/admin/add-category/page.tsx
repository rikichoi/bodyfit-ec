import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";

async function addCategory(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const category = await prisma.productCategory.create({
    data: {
      name,
      description,
    },
  });
  //   const category = [{ name, description }];
  //   console.log(category);
}

export default async function AddCategoryPage() {
  const categories = await prisma.productCategory.findMany({});
  return (
    <div className="p-40">
      <form action={addCategory} className="flex flex-col gap-3">
        <h1 className="mb-5 text-2xl font-bold">Add Category</h1>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Name of category"></Input>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Description of category"
        ></Input>
        <Button>Add Category</Button>
      </form>
      <p>{JSON.stringify(categories)}</p>
    </div>
  );
}
