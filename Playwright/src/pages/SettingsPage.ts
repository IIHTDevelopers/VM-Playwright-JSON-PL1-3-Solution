import { expect, Locator, Page } from "@playwright/test";
import { CommonMethods } from "src/tests/commonMethods";
import settings from "../Data/settings.json";

export class SettingsPage {
  readonly page: Page;
  private settingsLink: Locator;
  private radiologySubmodule: Locator;
  private addImagingTypeButton: Locator;
  private imagingItemNameField: Locator;
  private addButton: Locator;
  private searchBar: Locator;
  private dynamicTemplates: Locator;
  private addTemplateButton: Locator;
  private tamplateName: Locator;
  private templateType: Locator;
  private templatecode: Locator;
  private textField: Locator;
  private typeOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.settingsLink = page.locator('a[href="#/Settings"]');
    this.radiologySubmodule = page.locator(
      `//a[@href="#/Settings/RadiologyManage" and contains(text(),'Radiology')]`
    );
    this.addImagingTypeButton = page.locator(`//a[text()="Add Imaging Type"]`);
    this.imagingItemNameField = page.locator(`input#ImagingTypeName`);
    this.addButton = page.locator(`//input[@id="Add"]`);
    this.searchBar = page.locator(`input#quickFilterInput`);
    this.dynamicTemplates = page.locator(
      '(//a[@href="#/Settings/DynamicTemplates"])[2]'
    );
    this.addTemplateButton = page.locator(
      '//a[@id="id_btn_template_newTemplate"]'
    );
    this.tamplateName = page.locator('//input[@placeholder="template name"]');
    this.templateType = page.locator("//select[@id='TemplateTypeId']");
    this.templatecode = page.locator(
      '//input[@placeholder="enter template code"]'
    );
    this.textField = page.locator('//div[@id="cke_1_contents"]');
    this.typeOption = page.locator('//span[text()="Discharge Summary"]');
  }

  /**
   * @Test6
   * @description This method verifies the creation of dynamic templates in the Settings module.
   * It navigates to the Dynamic Templates submodule, fills out the template details including
   * template type, name, code, and text field, and ensures the template is added successfully.
   */

  async verifyDynamicTemplates() {
    const textField = settings.Templates.TextField;
    const templateName = settings.Templates.TemplateName;
    const templateCode = settings.Templates.TemplateCode;
    const templateType = settings.Templates.TemplateType;

    // Navigate to Settings module and click on Radiology submodule
    await CommonMethods.highlightElement(this.settingsLink);
    await this.settingsLink.click();

    await CommonMethods.highlightElement(this.dynamicTemplates);
    await this.dynamicTemplates.click();

    await CommonMethods.highlightElement(this.addTemplateButton);
    await this.addTemplateButton.click();

    await CommonMethods.highlightElement(this.templateType);
    await this.templateType.click();
    await this.templateType.selectOption(templateType);

    await CommonMethods.highlightElement(this.tamplateName);
    await this.tamplateName.type(templateName);

    await CommonMethods.highlightElement(this.templatecode);
    await this.templatecode.type(templateCode);

    await CommonMethods.highlightElement(this.textField);
    await this.textField.click();
    await this.textField.type(textField);

    await CommonMethods.highlightElement(this.addButton);
    await this.addButton.click();
  }
}
