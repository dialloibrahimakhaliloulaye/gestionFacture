import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FactureComponentsPage, FactureDeleteDialog, FactureUpdatePage } from './facture.page-object';

const expect = chai.expect;

describe('Facture e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let factureComponentsPage: FactureComponentsPage;
  let factureUpdatePage: FactureUpdatePage;
  let factureDeleteDialog: FactureDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Factures', async () => {
    await navBarPage.goToEntity('facture');
    factureComponentsPage = new FactureComponentsPage();
    await browser.wait(ec.visibilityOf(factureComponentsPage.title), 5000);
    expect(await factureComponentsPage.getTitle()).to.eq('gestionFactureApp.facture.home.title');
    await browser.wait(ec.or(ec.visibilityOf(factureComponentsPage.entities), ec.visibilityOf(factureComponentsPage.noResult)), 1000);
  });

  it('should load create Facture page', async () => {
    await factureComponentsPage.clickOnCreateButton();
    factureUpdatePage = new FactureUpdatePage();
    expect(await factureUpdatePage.getPageTitle()).to.eq('gestionFactureApp.facture.home.createOrEditLabel');
    await factureUpdatePage.cancel();
  });

  it('should create and save Factures', async () => {
    const nbButtonsBeforeCreate = await factureComponentsPage.countDeleteButtons();

    await factureComponentsPage.clickOnCreateButton();

    await promise.all([
      factureUpdatePage.setDateCreationInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      factureUpdatePage.setDateEcheanceInput('2000-12-31'),
      factureUpdatePage.setStatutInput('statut'),
      factureUpdatePage.factureItemSelectLastOption(),
    ]);

    expect(await factureUpdatePage.getDateCreationInput()).to.contain(
      '2001-01-01T02:30',
      'Expected dateCreation value to be equals to 2000-12-31'
    );
    expect(await factureUpdatePage.getDateEcheanceInput()).to.eq('2000-12-31', 'Expected dateEcheance value to be equals to 2000-12-31');
    expect(await factureUpdatePage.getStatutInput()).to.eq('statut', 'Expected Statut value to be equals to statut');

    await factureUpdatePage.save();
    expect(await factureUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await factureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Facture', async () => {
    const nbButtonsBeforeDelete = await factureComponentsPage.countDeleteButtons();
    await factureComponentsPage.clickOnLastDeleteButton();

    factureDeleteDialog = new FactureDeleteDialog();
    expect(await factureDeleteDialog.getDialogTitle()).to.eq('gestionFactureApp.facture.delete.question');
    await factureDeleteDialog.clickOnConfirmButton();

    expect(await factureComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
