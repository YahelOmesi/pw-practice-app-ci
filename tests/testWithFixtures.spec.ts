import { test } from "../test-options";
import { faker } from "@faker-js/faker";

test("parametrized methods", async ({ pageManager }) => {
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(1000)}@test.com`;

  //function #1
  await pageManager
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      process.env.USERNAME as string,
      process.env.PASSWORD as string,
      "Option 2",
    );

  //function #2
  await pageManager
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      false,
    );
});
