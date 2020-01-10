export class OpeningContent {
  public title: string;
  public description: string;

  constructor(title?: string, description?: string) {
    this.title = title || 'Hallo, ich bin Dennis Stoklosa';
    this.description = description || 'Ein leidenschaftlicher Software-Entwickler. Wissbegierig hinsichtlich aktuellster Technologien zur Umsetzung des Gesamtprodukts - mit dem Auge auf die User Experience.';
  }
}
