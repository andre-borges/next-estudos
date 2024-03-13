// selector serve pra calcular derived data, dado variado de outro dado, ex(quantidade de produtos deriva da lista de produtos(initialState) / preço total de produtos(initialState))

export const selectProductsCount = (rootReducer) => {
  return rootReducer.cartReducer.products.reduce((acc, curr) => acc + curr.quantity, 0);
};

export const selectProductsTotalPrice = (rootReducer) => {
  return rootReducer.cartReducer.products.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
};
