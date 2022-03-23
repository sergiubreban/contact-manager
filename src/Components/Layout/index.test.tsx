import { render, screen } from '@testing-library/react';
import Layout from '.';


describe('Layout component', () => {
  test('Should be defined', async () => {
    const component = render(
      <Layout />
    );

    expect(component).toBeDefined();
  });


  test('Should render children', async () => {
    render(
      <Layout>
        <p data-testid='child-component'>test</p>
      </Layout>
    );

    expect(screen.getByTestId('child-component')).toBeInTheDocument();
  });
});
