use employees;

INSERT INTO department
  (name)
VALUES
  ('Hero'),
  ('Guy In The Chair'),
  ('Villian');

INSERT INTO role
  (title, salary, department_id)
VALUES
  ('Superhero', 500000, 1),
  ('Sidekick', 250000, 1),
  ('Butlar', 100000, 2),
  ('Supervillian', 500000, 3),
  ('Villian', 250000, 3);

INSERT INTO employee
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Bruce', 'Wayne', 1, NULL),
  ('Hal', 'Jordan', 1, NULL),
  ('Dick', 'Grayson', 2, 1),
  ('Diana', 'of Themyscira', 1, NULL),
  ('Clark', 'Kent', 1, NULL),
  ('Alfred', 'Pennyworth', 3, 1),
  ('Lex', 'Luthor', 4, NULL),

  ('Mercy', 'Graves', 5, 7);