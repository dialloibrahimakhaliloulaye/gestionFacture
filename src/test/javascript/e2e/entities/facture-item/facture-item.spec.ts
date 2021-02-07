import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FactureItemComponentsPage, FactureItemDeleteDialog, FactureItemUpdatePage } from './facture-item.page-object';

const expect = chai.expect;

describe('FactureItem e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let factureItemComponentsPage: FactureItemComponentsPage;
  let factureItemUpdatePage: FactureItemUpdatePage;
  let factureItemDeleteDialog: FactureItemDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load FactureItems', async () => {
    await navBarPage.goToEntity('facture-item');
    factureItemComponentsPage = new FactureItemComponentsPage();
    await browser.wait(ec.visibilityOf(factureItemComponentsPage.title), 5000);
    expect(await factureItemComponentsPage.getTitle()).to.eq('gestionFactureApp.factureItem.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(factureItemComponentsPage.entities), ec.visibilityOf(factureItemComponentsPage.noResult)),
      1000
    );
  });

  it('should load create FactureItem page', async () => {
    await factureItemComponentsPage.clickOnCreateButton();
    factureItemUpdatePage = new FactureItemUpdatePage();
    expect(await factureItemUpdatePage.getPageTitle()).to.eq('gestionFactureApp.factureItem.home.createOrEditLabel');
    await factureItemUpdatePage.cancel();
  });

  it('should create and save FactureItems', async () => {
    const nbButtonsBeforeCreate = await factureItemComponentsPage.countDeleteButtons();

    await factureItemComponentsPage.clickOnCreateButton();

    await promise.all([
      factureItemUpdatePage.setQuantiteInput('5'),
      factureItemUpdatePage.setTotalInput('5'),
      factureItemUpdatePage.articleSelectLastOption(),
      factureItemUpdatePage.clientSelectLastOption(),
    ]);

    expect(await factureItemUpdatePage.getQuantiteInput()).to.eq('5', 'Expected quantite value to be equals to 5');
    expect(await factureItemUpdatePage.getTotalInput()).to.eq('5', 'Expected total value to be equals to 5');

    await factureItemUpdatePage.save();
    expect(await factureItemUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await factureItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last FactureItem', async () => {
    const nbButtonsBeforeDelete = await factureItemComponentsPage.countDeleteButtons();
    await factureItemComponentsPage.clickOnLastDeleteButton();

    factureItemDeleteDialog = new FactureItemDeleteDialog();
    expect(await factureItemDeleteDialog.getDialogTitle()).to.eq('gestionFactureApp.factureItem.delete.question');
    await factureItemDeleteDialog.clickOnConfirmButton();

    expect(await factureItemComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
