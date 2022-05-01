export type PostFormFixtureType = 'success' | 'error';

export interface PostFormPageObjectOptions {
  description: string;
  hydratesFields: boolean;
  selector: string;
  title: string;
  actionButtonLabel: string;
  path: string;
  pathRegex: RegExp;
}

export abstract class PostFormPO {

  get page() {
    return cy.get(this.options().selector);
  }

  get title() {
    return this.page.contains(this.options().title);
  }

  get actions() {
    return this.page.find('app-actions');
  }

  get cancelButton() {
    return this.actions.contains('Cancel');
  };

  get actionButton() {
    return this.actions.contains(this.options().actionButtonLabel);
  }

  get titleErrorMessage() {
    return this.page.contains('Fake Title Error Message');
  }

  get bodyErrorMessage() {
    return this.page.contains('Fake Body Error Message');
  }

  get titleInputField() {
    return this.page.find('[name=title]').first();
  }

  get bodyInputField() {
    return this.page.find('[name=body]').first();
  }

  abstract options(): PostFormPageObjectOptions;

  abstract interceptActionRequest(fixtureType?: PostFormFixtureType, delay?: number): void;

  abstract backNavigationTarget(): { shouldBeActive: () => void };

  visit() {
    cy.visit(this.options().path);
    this.shouldBeActive();
  }

  shouldBeActive() {
    cy.url().should('match', this.options().pathRegex);
    this.page.should('be.visible');
  }

  inputFormValues(values: { title?: string; body?: string } = { title: 'Some title', body: 'Some body' }) {
    this.titleInputField.clear();
    this.bodyInputField.clear();

    if (values.title) {
      this.titleInputField.type(values.title);
    }

    if (values.body) {
      this.bodyInputField.type(values.body);
    }
  }
}
