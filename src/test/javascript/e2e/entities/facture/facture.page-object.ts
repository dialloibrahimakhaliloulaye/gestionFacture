import { element, by, ElementFinder } from 'protractor';

export class FactureComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-facture div table .btn-danger'));
  title = element.all(by.css('jhi-facture div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class FactureUpdatePage {
  pageTitle = element(by.id('jhi-facture-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  dateCreationInput = element(by.id('field_dateCreation'));
  dateEcheanceInput = element(by.id('field_dateEcheance'));
  statutInput = element(by.id('field_statut'));

  factureItemSelect = element(by.id('field_factureItem'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDateCreationInput(dateCreation: string): Promise<void> {
    await this.dateCreationInput.sendKeys(dateCreation);
  }

  async getDateCreationInput(): Promise<string> {
    return await this.dateCreationInput.getAttribute('value');
  }

  async setDateEcheanceInput(dateEcheance: string): Promise<void> {
    await this.dateEcheanceInput.sendKeys(dateEcheance);
  }

  async getDateEcheanceInput(): Promise<string> {
    return await this.dateEcheanceInput.getAttribute('value');
  }

  async setStatutInput(statut: string): Promise<void> {
    await this.statutInput.sendKeys(statut);
  }

  async getStatutInput(): Promise<string> {
    return await this.statutInput.getAttribute('value');
  }

  async factureItemSelectLastOption(): Promise<void> {
    await this.factureItemSelect.all(by.tagName('option')).last().click();
  }

  async factureItemSelectOption(option: string): Promise<void> {
    await this.factureItemSelect.sendKeys(option);
  }

  getFactureItemSelect(): ElementFinder {
    return this.factureItemSelect;
  }

  async getFactureItemSelectedOption(): Promise<string> {
    return await this.factureItemSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class FactureDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-facture-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-facture'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
