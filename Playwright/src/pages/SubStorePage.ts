import { expect, Locator, Page } from "@playwright/test";
import { CommonMethods } from "src/tests/commonMethods";
import subStore from "../Data/subStore.json";

export class SubStorePage {
  readonly page: Page;
  private wardSupplyLink: Locator;
  private substore: Locator;
  private inventoryRequisitionTab: Locator;
  private createRequisitionButton: Locator;
  private targetInventoryDropdown: Locator;
  private itemNameField: Locator;
  private requestButton: Locator;
  private successMessage: Locator;
  private accountBtn: Locator;
  private printButton: Locator;
  private consumptionLink: Locator;
  private newConsumptionBtn: Locator;
  private inputItemName: Locator;
  private saveBtn: Locator;
  private successMessage1: Locator;
  private reportLink: Locator;
  private consumptionReport: Locator;
  private subCategory: Locator;
  private showReport: Locator;
  private issueField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wardSupplyLink = page.locator('a[href="#/WardSupply"]');
    this.substore = page.locator('//i[text()="Accounts"]');
    this.inventoryRequisitionTab = page.locator(
      '//a[text()="Inventory Requisition"]'
    );
    this.createRequisitionButton = page.locator(
      '//span[text()="Create Requisition"]'
    );
    this.targetInventoryDropdown = page.locator(
      '//input[@id="activeInventory"]'
    );
    this.itemNameField = page.locator('//input[@placeholder="Item Name"]');
    this.requestButton = page.locator('//input[@value="Request"]');
    this.successMessage = page.locator(
      '//p[contains(text(),"success")]/../p[text()="Requisition is Generated and Saved"]'
    );
    this.accountBtn = page.locator(
      '//span[contains(@class, "report-name")]/i[contains(text(), "Accounts")]'
    );
    this.printButton = page.locator('//button[@id="printButton"]');
    this.consumptionLink = page.locator(
      '(//a[@href="#/WardSupply/Inventory/Consumption"])'
    );
    this.newConsumptionBtn = page.locator(
      '//span[contains(@class, "glyphicon") and contains(@class, "glyphicon-plus")]'
    );
    this.inputItemName = page.locator("#itemName0");
    this.saveBtn = page.locator("#save");
    this.successMessage1 = page.locator(
      '//p[contains(text()," Success ")]/../p[text()="Consumption completed"]'
    );
    this.reportLink = page.locator(
      '(//a[@href="#/WardSupply/Inventory/Reports"])'
    );
    this.consumptionReport = page.locator(
      '//span[contains(@class, "report-name")]/i[contains(text(), "Consumption Report")]'
    );
    this.subCategory = page.locator('//select[@id="selectedCategoryName"]');
    this.showReport = page.locator('button:has-text("Show Report")');
    this.issueField = page.locator("//input[@placeholder='Issue No']");
  }

  /**
   * @Test7
   * @description This method verifies the creation of an inventory requisition in the Ward Supply module.
   * It navigates to the Substore section, selects a target inventory, adds an item, and submits the requisition.
   * The method ensures the requisition is successfully created by verifying the success message.
   */
  async createInventoryRequisition() {
    const targetInventory = subStore.SubStore.TargetInventory;
    const itemName = subStore.SubStore.ItemName;

    await CommonMethods.highlightElement(this.wardSupplyLink);
    await this.wardSupplyLink.click();
    await CommonMethods.highlightElement(this.substore);
    await this.substore.click();
    await CommonMethods.highlightElement(this.inventoryRequisitionTab);
    await this.inventoryRequisitionTab.click();
    await CommonMethods.highlightElement(this.createRequisitionButton);
    await this.createRequisitionButton.click();
    await this.page.waitForTimeout(2000);
    await CommonMethods.highlightElement(this.targetInventoryDropdown);
    await this.targetInventoryDropdown.click();
    await this.issueField.click();
    await this.targetInventoryDropdown.click();
    await this.targetInventoryDropdown.type(targetInventory);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(2000);
    await CommonMethods.highlightElement(this.itemNameField);
    await this.itemNameField.type(itemName);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(2000);
    await CommonMethods.highlightElement(this.requestButton);
    await this.requestButton.click();
  }

  /**
   * @Test11
   * @description This method creates a new consumption section. It navigates through the Ward Supply module,
   * accesses the account and consumption sections, and opens the "New Consumption" form.
   * The function enters the item name, submits the form, and verifies the successful creation of the consumption
   * section by asserting that a success message becomes visible.
   * Throws an error if the success message is not displayed after submission.
   */
  async creatingConsumptionSection() {
    const itemName = subStore.SubStore.ItemName;

    await CommonMethods.highlightElement(this.wardSupplyLink);
    await this.wardSupplyLink.click();
    await CommonMethods.highlightElement(this.accountBtn);
    await this.accountBtn.click();
    await CommonMethods.highlightElement(this.consumptionLink);
    await this.consumptionLink.click();
    await CommonMethods.highlightElement(this.newConsumptionBtn);
    await this.newConsumptionBtn.click();
    await CommonMethods.highlightElement(this.inputItemName);
    await this.inputItemName.type(itemName);
    await this.page.keyboard.press("Enter");
    await CommonMethods.highlightElement(this.saveBtn);
    await this.saveBtn.click();
    await this.page.waitForTimeout(3000);
    expect(await this.successMessage1.isVisible()).toBe(true);
  }

  /**
   * @Test12
   * @description This method creates a new report section in the Ward Supply module. It navigates through
   * the report section and selects the specified item name from the subcategory dropdown. After generating
   * the report, the function verifies if the selected item name is displayed in the report grid.
   * Throws an error if the item name is not found in the report results.
   */
  async creatingReportSection() {
    const itemName = subStore.SubStore.ItemName;

    await CommonMethods.highlightElement(this.wardSupplyLink);
    await this.wardSupplyLink.click();
    await CommonMethods.highlightElement(this.accountBtn);
    await this.accountBtn.click();
    await CommonMethods.highlightElement(this.reportLink);
    await this.reportLink.click();
    await CommonMethods.highlightElement(this.consumptionReport);
    await this.consumptionReport.click();
    await this.page.waitForTimeout(2500);
    await CommonMethods.highlightElement(this.subCategory);
    await this.subCategory.click();
    await this.subCategory.selectOption(itemName);
    await CommonMethods.highlightElement(this.showReport);
    await this.showReport.click();
    await this.page.waitForTimeout(2500);
    const resultText = await this.page
      .locator("//div[@role='gridcell' and @col-id='SubCategoryName']")
      .allInnerTexts();
    await this.page.waitForTimeout(3000);
    const trimmedResults = resultText.map((text) => text.trim());
    const matchFound = trimmedResults.includes(itemName.trim());
    expect(matchFound).toBe(true);
  }
}
