import { Page, expect, Locator } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";
import pharmacy from "../Data/pharmacy.json";

export default class PharmacyPage {
  readonly page: Page;
  private pharmacyModule: Locator;
  private orderLink: Locator;
  private addNewGoodReceiptButton: Locator;
  private goodReceiptModalTitle: Locator;
  private printReceiptButton: Locator;
  private addNewItemButton: Locator;
  private itemNameField: Locator;
  private batchNoField: Locator;
  private itemQtyField: Locator;
  private rateField: Locator;
  private saveButton: Locator;
  private supplierNameField: Locator;
  private invoiceField: Locator;
  private successMessage: Locator;
  private supplierName: Locator;
  private showDetails: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pharmacyModule = page.locator('a[href="#/Pharmacy"]');
    this.orderLink = page.locator('//a[contains(text(),"Order")]');
    this.addNewGoodReceiptButton = page.locator(
      "//button[contains(text(),'Add New Good Receipt')]"
    );
    this.goodReceiptModalTitle = page.locator(
      `//span[contains(text(),"Add Good Receipt")]`
    );
    this.printReceiptButton = page.locator(`//button[@id="saveGr"]`);
    this.addNewItemButton = page.locator(`//button[@id="btn_AddNew"]`);
    this.itemNameField = page.locator(`//input[@placeholder="Select an Item"]`);
    this.batchNoField = page.locator('//input[@id="txt_BatchNo"]');
    this.itemQtyField = page.locator('//input[@id="ItemQTy"]');
    this.rateField = page.locator('//input[@id="GRItemPrice"]');
    this.saveButton = page.locator('//button[@id="btn_Save"]');
    this.supplierNameField = page.locator('//input[@id="SupplierName"]');
    this.invoiceField = page.locator('//input[@id="InvoiceId"]');
    this.successMessage = page.locator(
      '//p[contains(text(),"success")]/../p[text()="Goods Receipt is Generated and Saved."]'
    );
    this.supplierName = page.locator('//input[@placeholder="select supplier"]');
    this.showDetails = page.locator('//button[text()=" Show Details "]');
  }

  /**
   * @Test1
   * @description This method navigates to the Pharmacy module, verifies the Good Receipt modal,
   * handles alerts during the Good Receipt print process, and ensures the modal is visible
   * before performing further actions.
   */

  async handlingAlertOnRadiology() {
    try {
      await CommonMethods.highlightElement(this.pharmacyModule);
      await this.pharmacyModule.click();
      await CommonMethods.highlightElement(this.orderLink);
      await this.orderLink.click();
      await this.addNewGoodReceiptButton.click();
      expect(await this.goodReceiptModalTitle.isVisible()).toBeTruthy();
      await this.printReceiptButton.click();
      await this.handleAlert();
    } catch (error) {
      console.error("Error performing Good Receipt print:", error);
    }
  }
  async handleAlert(): Promise<boolean> {
    try {
      // Wait for the alert, then accept it
      this.page.on("dialog", async (dialog) => {
        console.log(`Alert message: ${dialog.message()}`);
        if (
          dialog
            .message()
            .includes("Changes will be discarded. Do you want to close anyway?")
        ) {
          await dialog.accept();
          console.log("Alert accepted.");
        } else {
          await dialog.dismiss();
          console.log("Alert dismissed.");
        }
      });
      return true;
    } catch (error) {
      console.error("Failed to handle alert:", error);
      return false;
    }
  }

  /**
   * @Test2
   * @description This method verifies the process of adding a new Good Receipt in the Pharmacy module,
   * filling in item details such as item name, batch number, quantity, rate, supplier name,
   * and a randomly generated invoice number. It concludes by validating the successful printing of the receipt.
   */

  async verifyPrintReceipt() {
    const itemName = pharmacy.Fields.ItemName;
    const batchNoField = pharmacy.Fields.BatchNoField;
    const itemQtyField = pharmacy.Fields.ItemQtyField;
    const rateField = pharmacy.Fields.RateField;
    const supplierNameField = pharmacy.Fields.SupplierNameField;

    await CommonMethods.highlightElement(this.pharmacyModule);
    await this.pharmacyModule.click();
    await CommonMethods.highlightElement(this.orderLink);
    await this.orderLink.click();
    await CommonMethods.highlightElement(this.addNewGoodReceiptButton);
    await this.addNewGoodReceiptButton.click();
    await CommonMethods.highlightElement(this.addNewItemButton);
    await this.addNewItemButton.click();
    await CommonMethods.highlightElement(this.itemNameField);
    await this.itemNameField.click();
    await this.itemNameField.type(itemName);
    await this.page.keyboard.press("Enter");
    await CommonMethods.highlightElement(this.batchNoField);
    await this.batchNoField.type(batchNoField);
    await this.page.keyboard.press("Enter");
    await CommonMethods.highlightElement(this.itemQtyField);
    await this.itemQtyField.type(itemQtyField);
    await this.page.keyboard.press("Enter");
    await CommonMethods.highlightElement(this.rateField);
    await this.rateField.type(rateField);
    await this.page.keyboard.press("Enter");
    await CommonMethods.highlightElement(this.saveButton);
    await this.saveButton.click();
    await CommonMethods.highlightElement(this.supplierNameField);
    await this.supplierNameField.click();
    await this.supplierNameField.type(supplierNameField);
    await this.page.keyboard.press("Enter");
    const randomInvoiceNo = Math.floor(100 + Math.random() * 900).toString();
    await CommonMethods.highlightElement(this.invoiceField);
    await this.invoiceField.type(randomInvoiceNo);
    await CommonMethods.highlightElement(this.printReceiptButton);
    await this.printReceiptButton.click();
    await this.page.waitForTimeout(2000);
    expect(await this.successMessage.isVisible()).toBe(true);
  }

  /**
   * @Test13
   * @description This method verifies the presence of a supplier name in the order section of the Pharmacy module.
   * It navigates through the necessary elements to input the supplier name, triggers the search, and then checks if
   * the supplier name appears in the results grid. If the supplier name is not found, it throws an error.
   */
  async verifypresenceOfSupplierName() {
    const supplierNameField = pharmacy.Fields.SupplierNameField;

    await CommonMethods.highlightElement(this.pharmacyModule);
    await this.pharmacyModule.click();
    await CommonMethods.highlightElement(this.orderLink);
    await this.orderLink.click();
    await CommonMethods.highlightElement(this.supplierName);
    await this.supplierName.click();
    await this.supplierName.type(supplierNameField);
    await this.page.keyboard.press("Enter");
    await CommonMethods.highlightElement(this.showDetails);
    await this.showDetails.click();
    await this.page.waitForTimeout(3000);
    // Capture and verify the search result
    const resultText = await this.page
      .locator("//div[@role='gridcell' and @col-id='SupplierName']")
      .allInnerTexts();
    await this.page.waitForTimeout(3000);
    // Trim and check if any result matches the gender
    const trimmedResults = resultText.map((text) => text.trim());
    const matchFound = trimmedResults.includes(supplierNameField.trim());

    expect(matchFound).toBe(true);
  }
}
