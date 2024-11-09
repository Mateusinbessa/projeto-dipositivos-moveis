CREATE TABLE receitas(
  id SERIAL PRIMARY KEY,
  date VARCHAR(50) NOT NULL,
  amount INT NOT NULL,
  description VARCHAR(200) NOT NULL
);

CREATE TABLE despesas(
  id SERIAL PRIMARY KEY,
  date VARCHAR(50) NOT NULL,
  amount INT NOT NULL,
  description VARCHAR(200) NOT NULL
);

INSERT INTO public.receitas  (date, amount, description) VALUES ('30/05/2024', 100, 'Receita de aniversário');
INSERT INTO public.despesas  (date, amount, description) VALUES ('30/05/2024', 80, 'Despesa de aniversário');