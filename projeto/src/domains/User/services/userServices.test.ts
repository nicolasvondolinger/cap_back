import { User } from "@prisma/client";

import userServices from "./userServices";
import { prismaMock } from "../../../../config/singleton";
import { QueryError } from "../../../../errors/QueryError";


jest.mock("bcrypt");
jest.mock("nodemailer");

describe('createUser', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  const userData: User = {
    id: 1,
    email: "nicolas28lagoas@gmail.com",
    name: "Nicolas",
    password: "Nicolas0208von",
    photo: "AAA",
    role: "Normal"
  };

  const newUser: User = {
    id: 1,
    email: "nicolas28lagoas@gmail.com",
    name: "Nicolas",
    password: "Nicolas0208von",
    photo: "AAA",
    role: "Normal"
  };

  test("Receive user info ==> create user oon db", async() => {
    prismaMock.user.create.mockRejectedValue(userData);
    await expect(userServices.create(userData)).resolves.toEqual(newUser);
  });

  test("user already exists ==> throw error", async() => {
    prismaMock.user.findFirst.mockResolvedValue(newUser);

    await expect(userServices.create(newUser)).rejects.toThrow(new QueryError("Esse usuário já está cadastrado no sistema."));
  });

})