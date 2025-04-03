"use server";

import { currentUser } from "@clerk/nextjs/server";
import { client } from "../prisma/prisma";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        user: null,
        error: "User not authenticated",
        status: 403, // Status code for forbidden
      };
    }

    const userExist = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        PurchasedProjects: {
          select: {
            id: true,
          },
        },
      },
    });

    if (userExist) {
      return {
        user: userExist,
        error: null,
        status: 200, // Status code for OK
      };
    }

    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName + " " + user.lastName,
        profileImage: user.imageUrl,
      },
    });

    if (newUser) {
      return {
        user: newUser,
        error: null,
        status: 201, // Status code for created resource
      };
    }

    return {
      user: null,
      error: "User creation failed",
      status: 400, // Status code for bad request
    };
  } catch (error) {
    console.error("🔴 Error:", error);

    return {
      user: null,
      error: "Error fetching user",
      status: 500, // Status code for internal server error
    };
  }
};
