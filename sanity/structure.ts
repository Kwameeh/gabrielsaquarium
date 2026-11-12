import type { StructureResolver } from 'sanity/structure';

const productTypes = ['tank', 'fish', 'feed', 'accessory'];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings & Homepage Copy')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.listItem()
        .title('Pages')
        .child(S.documentTypeList('page').title('Pages')),
      S.divider(),
      S.listItem()
        .title('Products')
        .child(
          S.list()
            .title('Products')
            .items(productTypes.map((type) => S.documentTypeListItem(type)))
        ),
      S.divider(),
      S.documentTypeListItem('gallery').title('Gallery'),
      ...S.documentTypeListItems().filter(
        (item) => !['siteSettings', 'gallery', 'page', ...productTypes].includes(item.getId() ?? '')
      ),
    ]);
