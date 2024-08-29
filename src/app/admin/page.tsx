import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

async function addCategory(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  await prisma.productCategory.create({
    data: {
      name,
      description,
    },
  });
  revalidatePath("/admin");
}

async function addDiscount(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const discount_percent = parseInt(formData.get("discount_percent") as string);
  await prisma.discount.create({
    data: {
      name,
      description,
      discount_percent,
    },
  });
  revalidatePath("/admin");
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }
  const categories = await prisma.productCategory.findMany({});
  const discounts = await prisma.discount.findMany({});

  return (
    <div className="flex flex-col gap-10 p-40">
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
      <form action={addDiscount} className="flex flex-col gap-3">
        <h1 className="mb-5 text-2xl font-bold">Add Discount</h1>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Name of discount"></Input>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Description of discount"
        ></Input>
        <Label htmlFor="discount_percent">Description</Label>
        <Input
          id="discount_percent"
          name="discount_percent"
          placeholder="Discount Amount"
        ></Input>
        <Button>Add Discount</Button>
      </form>
      <p>{discounts && JSON.stringify(discounts)}</p>
    </div>
  );
}
