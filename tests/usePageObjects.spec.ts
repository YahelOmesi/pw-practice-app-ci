import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

test.describe.configure({ mode: "serial" });

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("navigate to form page", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datepickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test("parametrized methods", async ({ page }) => {
  const pm = new PageManager(page);
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(1000)}@test.com`;

  await pm.navigateTo().formLayoutsPage();

  //function #1
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentialsAndSelectOption(
      process.env.USERNAME as string,
      process.env.PASSWORD as string,
      "Option 2",
    );

  await page.screenshot({ path: "screenshots/formsLayoutPage.png" });
  const buffer = await page.screenshot();
  console.log(buffer.toString("base64"));

  //function #2
  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithNameEmailAndCheckbox(
      randomFullName,
      randomEmail,
      false,
    );

  await page
    .locator("nb-card", { hasText: "Inline Form" })
    .screenshot({ path: "screenshots/inlineForm.png" });

  await pm.navigateTo().datepickerPage();
  await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(2);
  await pm.onDatepickerPage().selctDatePickerWithRangeFromToday(2, 4);
});
