import { Page, expect, Locator } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";
import medicalRecord from "../Data/medicalRecord.json";
export default class MedicalRecordsPage {
  readonly page: Page;
  public medicalRecord: {
    medicalRecordsLink: Locator;
    mrOutpatientList: Locator;
    okButton: Locator;
    fromDate: Locator;
    searchBar: Locator;
    doctorFilter: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.medicalRecord = {
      medicalRecordsLink: page.locator('a[href="#/Medical-records"]'),
      mrOutpatientList: page.locator(
        '(//a[@href="#/Medical-records/OutpatientList"])[2]'
      ),
      okButton: page.locator('//button[@class="btn green btn-success"]'),
      searchBar: page.locator("#quickFilterInput"),
      fromDate: page.locator(`(//input[@id="date"])[1]`),
      doctorFilter: page.locator('//input[@placeholder="Doctor Name"]'),
    };
  }

  /**
   * @Test4
   * @description This method verifies patient records in the Dispensary module by applying a date filter
   * and searching for a specific patient by gender. It validates the search results by checking if the
   * gender appears in the filtered records.
   */
  async keywordMatching() {
    const fromDate = medicalRecord.DateRange.FromDate;
    const gender = medicalRecord.PatientGender.Gender;
    const doctor = medicalRecord.DoctorName.Doctor;
    // Navigate to Dispensary module
    await CommonMethods.highlightElement(this.medicalRecord.medicalRecordsLink);
    await this.medicalRecord.medicalRecordsLink.click();
    await CommonMethods.highlightElement(this.medicalRecord.mrOutpatientList);
    await this.medicalRecord.mrOutpatientList.click();
    // Wait for the page to load
    await this.page.waitForTimeout(2000);

    await CommonMethods.highlightElement(this.medicalRecord.fromDate);
    await this.medicalRecord.fromDate.type(fromDate);

    await CommonMethods.highlightElement(this.medicalRecord.okButton);
    await this.medicalRecord.okButton.click();

    await CommonMethods.highlightElement(this.medicalRecord.searchBar);
    await this.medicalRecord.okButton.click();

    console.log(`Verifying patient: ${gender}`);
    await CommonMethods.highlightElement(this.medicalRecord.searchBar);
    await this.medicalRecord.searchBar.fill(gender);
    await this.page.keyboard.press("Enter");
    await this.page.waitForTimeout(3000);
    // Capture and verify the search result
    const resultText = await this.page
      .locator("//div[@role='gridcell' and @col-id='Gender']")
      .allInnerTexts();
    await this.page.waitForTimeout(3000);
    // Trim and check if any result matches the gender
    const trimmedResults = resultText.map((text) => text.trim());
    const matchFound = trimmedResults.includes(gender.trim());

    expect(matchFound).toBe(true);
  }

  /**
   * @Test5
   * @description This method verifies the presence of the doctor filter functionality in the medical records module.
   * It applies the filter by selecting a specific doctor and a date range, and validates that the search results
   * correctly display records associated with the selected doctor.
   */
  async presenceOfDoctorFilter() {
    const fromDate = medicalRecord.DateRange.FromDate;
    const gender = medicalRecord.PatientGender.Gender;
    const doctor = medicalRecord.DoctorName.Doctor;

    // Navigate to Dispensary module
    await CommonMethods.highlightElement(this.medicalRecord.medicalRecordsLink);
    await this.medicalRecord.medicalRecordsLink.click();
    await CommonMethods.highlightElement(this.medicalRecord.mrOutpatientList);
    await this.medicalRecord.mrOutpatientList.click();
    // Wait for the page to load
    await this.page.waitForTimeout(2000);

    await CommonMethods.highlightElement(this.medicalRecord.doctorFilter);
    await this.medicalRecord.doctorFilter.click();
    await this.medicalRecord.doctorFilter.type(doctor);

    await CommonMethods.highlightElement(this.medicalRecord.fromDate);
    await this.medicalRecord.fromDate.type(fromDate);

    await CommonMethods.highlightElement(this.medicalRecord.okButton);
    await this.medicalRecord.okButton.click();

    await this.page.waitForTimeout(3000);
    // Capture and verify the search result
    const resultText = await this.page
      .locator("//div[@role='gridcell' and @col-id='PerformerName']")
      .allInnerTexts();
    await this.page.waitForTimeout(3000);
    // Trim and check if any result matches the gender
    const trimmedResults = resultText.map((text) => text.trim());
    const matchFound = trimmedResults.includes(doctor.trim());

    expect(matchFound).toBe(true);
  }
}
