import type { StructureResolver } from 'sanity/structure';

const productTypes = ['tank', 'fish', 'feed', 'accessory'];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.listItem()
        .title('Products')
        .child(
          S.list()
            .title('Products')
            .items(productTypes.map((type) => S.documentTypeListItem(type)))
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['siteSettings', ...productTypes].includes(item.getId() ?? '')
      ),
    ]);
