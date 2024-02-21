import UserService from "./src/domains/User/services/UserServices";

async function main() {
    const body = {
      email: "nicolasvondolinger@gmail.com",
      name: "Nicolas",
      role: "ADMIN",
      password: "nicolas"
    };

    const user = await UserService.create(body);

    console.log(user);
}

main();