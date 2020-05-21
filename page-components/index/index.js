import React from 'react';
import { useQuery } from 'urql';
import Grid from '@crystallize/grid-renderer';

import Layout from 'components/layout';
import CategoryItem from 'components/category-item';
import { H1, Header } from 'ui';
import itemFragment from 'lib/graph/fragments/item';
import productFragment from 'lib/graph/fragments/product';

import { Outer } from './styles';

export default function FrontPage() {
  const [{ fetching, error, data }] = useQuery({
    query: `
      query FRONTPAGE_GRID($id: ID!, $language: String!) {
        grid(id: $id, language: $language) {
          id
          name
          rows {
            columns {
              layout {
                rowspan
                colspan
              }
              itemType
              itemId
              item {
                ... on Item {
                  ...item
                  ...product
                }
              }
            }
          }
        }
      }
    
      ${itemFragment}
      ${productFragment}
    `,
    variables: { id: '5ea85ce153d66b001c00bef1', language: 'en' }
  });

  if (fetching) {
    return <Layout loading />;
  }

  if (error || !data) {
    return <Layout error />;
  }

  const { grid } = data;

  return (
    <Layout title="Home">
      <Outer>
        <Header>
          <H1>Ørn forlag</H1>
          <p>
            Brer sine vide vinger over sentrale deler av norsk natur, og bærer
            kunnskap ut til folket gjennom fysiske såvel som digitale medier.
          </p>
        </Header>

        {grid && (
          <Grid
            model={grid}
            cellComponent={({ cell }) => (
              <CategoryItem data={cell.item} gridCell={cell} />
            )}
          />
        )}
      </Outer>
    </Layout>
  );
}
