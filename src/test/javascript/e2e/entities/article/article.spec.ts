import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ArticleComponentsPage, ArticleDeleteDialog, ArticleUpdatePage } from './article.page-object';

const expect = chai.expect;

describe('Article e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let articleComponentsPage: ArticleComponentsPage;
  let articleUpdatePage: ArticleUpdatePage;
  let articleDeleteDialog: ArticleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Articles', async () => {
    await navBarPage.goToEntity('article');
    articleComponentsPage = new ArticleComponentsPage();
    await browser.wait(ec.visibilityOf(articleComponentsPage.title), 5000);
    expect(await articleComponentsPage.getTitle()).to.eq('gestionFactureApp.article.home.title');
    await browser.wait(ec.or(ec.visibilityOf(articleComponentsPage.entities), ec.visibilityOf(articleComponentsPage.noResult)), 1000);
  });

  it('should load create Article page', async () => {
    await articleComponentsPage.clickOnCreateButton();
    articleUpdatePage = new ArticleUpdatePage();
    expect(await articleUpdatePage.getPageTitle()).to.eq('gestionFactureApp.article.home.createOrEditLabel');
    await articleUpdatePage.cancel();
  });

  it('should create and save Articles', async () => {
    const nbButtonsBeforeCreate = await articleComponentsPage.countDeleteButtons();

    await articleComponentsPage.clickOnCreateButton();

    await promise.all([
      articleUpdatePage.setLibelleInput('libelle'),
      articleUpdatePage.setDescriptionInput('description'),
      articleUpdatePage.setPrixInput('5'),
    ]);

    expect(await articleUpdatePage.getLibelleInput()).to.eq('libelle', 'Expected Libelle value to be equals to libelle');
    expect(await articleUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await articleUpdatePage.getPrixInput()).to.eq('5', 'Expected prix value to be equals to 5');

    await articleUpdatePage.save();
    expect(await articleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await articleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Article', async () => {
    const nbButtonsBeforeDelete = await articleComponentsPage.countDeleteButtons();
    await articleComponentsPage.clickOnLastDeleteButton();

    articleDeleteDialog = new ArticleDeleteDialog();
    expect(await articleDeleteDialog.getDialogTitle()).to.eq('gestionFactureApp.article.delete.question');
    await articleDeleteDialog.clickOnConfirmButton();

    expect(await articleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
