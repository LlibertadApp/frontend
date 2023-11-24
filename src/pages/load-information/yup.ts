import * as Yup from 'yup';

const votesValidation = Yup.object().shape({
  lla: Yup.number()
    .integer('El número de votos debe ser un entero')
    .min(0, 'El número de votos debe ser mayor o igual a 0')
    .max(600, 'El número de votos no puede ser mayor que 600')
    .required('El número de votos es obligatorio'),
  uxp: Yup.number()
    .integer('El número de votos debe ser un entero')
    .min(0, 'El número de votos debe ser mayor o igual a 0')
    .max(600, 'El número de votos no puede ser mayor que 600')
    .required('El número de votos es obligatorio'),
  blank: Yup.number()
    .integer('El número de votos debe ser un entero')
    .min(0, 'El número de votos debe ser mayor o igual a 0')
    .max(600, 'El número de votos no puede ser mayor que 600')
    .required('El número de votos es obligatorio'),
  null: Yup.number()
    .integer('El número de votos debe ser un entero')
    .min(0, 'El número de votos debe ser mayor o igual a 0')
    .max(600, 'El número de votos no puede ser mayor que 600')
    .required('El número de votos es obligatorio'),
  disputed: Yup.number()
    .integer('El número de votos debe ser un entero')
    .min(0, 'El número de votos debe ser mayor o igual a 0')
    .max(600, 'El número de votos no puede ser mayor que 600')
    .required('El número de votos es obligatorio'),
  identity: Yup.number()
    .integer('El número de votos debe ser un entero')
    .min(0, 'El número de votos debe ser mayor o igual a 0')
    .max(600, 'El número de votos no puede ser mayor que 600')
    .required('El número de votos es obligatorio'),
  command: Yup.number()
    .integer('El número de votos debe ser un entero')
    .min(0, 'El número de votos debe ser mayor o igual a 0')
    .max(600, 'El número de votos no puede ser mayor que 600')
    .required('El número de votos es obligatorio'),
})

const envelopesValidation = Yup.number()
.integer('El número de sobres debe ser un entero')
.positive('El número de sobres debe ser mayor a 0')
.max(600, 'El número de votos no puede ser mayor que 600')
.required('El número de sobres es obligatorio')
.test('is-within-range', function (value) {
  const { electors } = this.parent; // Obtiene el valor de "electores" del mismo contexto
  const difference = Math.abs((electors || 0) - (value || 0));

  // El mensaje debe ser prural o singular dependiendo de la diferencia
  // Mensaje de ejemplo: Hay una diferencia de 5 sobres con respecto a los electores
  const message = `Hay una diferencia de ${difference} ${
    difference > 1 ? 'sobres' : 'sobre'
  } con respecto a los electores`;

  return (
    difference <= 5 ||
    this.createError({ path: 'validVotesDifference', message })
  );
})

const electorsValidation = Yup.number()
.integer('El número de electores debe ser un entero')
.positive('El número de electores debe ser mayor a 0')
.max(600, 'El número de votos no puede ser mayor que 600')
.required('El número de electores es obligatorio')

export const validationSchema = Yup.object().shape({
  circuit: Yup.string().required('Debe ingresar un circuito'),
  table: Yup.string().required('Debe ingresar una mesa'),
  electors: electorsValidation,
  envelopes: envelopesValidation,
  votes: votesValidation,
  validTotalVotes: Yup.boolean().test('is-within-range', function () {
    const { envelopes, votes } = this.parent;
    const totalVotes =
      votes.lla +
      votes.uxp +
      votes.blank +
      votes.null +
      votes.disputed +
      votes.identity +
      votes.command;

    if (totalVotes > 600) {
      return this.createError({
        path: 'validTotalVotes',
        message: 'El total de votos es mayor que 600',
      });
    } else if (!(totalVotes === envelopes)) {
      return this.createError({
        path: 'validTotalVotes',
        message: 'La suma no coincide con el total de votos',
      });
    }

    return true;
  }),

  formAgreement: Yup.boolean().oneOf(
    [true],
    'Debe aceptar el acuerdo de la mesa',
  ),
});