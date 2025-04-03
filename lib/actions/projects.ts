"use server";

import { client } from "../prisma/prisma";
import { onAuthenticateUser } from "./user";

export const getAllProjects = async () => {
  try {
    const checkUser = await onAuthenticateUser();

    if (checkUser.status !== 200 && !checkUser.status) {
      return {
        projects: null,
        error: "User not authenticated",
        status: 403, // Status code for forbidden
      };
    }

    const projects = await client.project.findMany({
      where: {
        userId: checkUser.user?.id,
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (projects.length === 0) {
      return {
        projects: null,
        error: "No projects found",
        status: 404, // Status code for not found
      };
    }

    return {
      projects: projects,
      error: null,
      status: 200, // Status code for OK
    };
  } catch (error) {
    console.error("🔴 Error", error);

    return {
      projects: null,
      error: "Internal server error",
      status: 500, // Status code for internal server error
    };
  }
};
