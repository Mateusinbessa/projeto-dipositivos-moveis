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

insert into public.receitas  (date, amount, description) values ('30/05/2003', 100, 'Receita de aniversário');
insert into public.receitas  (date, amount, description) values ('29/10/2005', 100, 'Receita de nascimento');
insert into public.receitas  (date, amount, description) values ('12/11/1980', 100, 'Receita de médicos');

insert into public.despesas  (date, amount, description) values ('30/05/2003', 80, 'Despesa de aniversário');
insert into public.despesas  (date, amount, description) values ('29/10/2005', 80, 'Despesa de nascimento');
insert into public.despesas  (date, amount, description) values ('12/11/1980', 80, 'Despesa de médicos');