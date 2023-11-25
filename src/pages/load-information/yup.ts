import * as Yup from 'yup';

const votesValidation = (t: (str: string) => string) =>
  Yup.object().shape({
    lla: Yup.number().integer(t('integer_votes')).min(0, t('non_negative_votes')).max(600, t('max_votes_limit')).required(t('required_votes')),
    uxp: Yup.number().integer(t('integer_votes')).min(0, t('non_negative_votes')).max(600, t('max_votes_limit')).required(t('required_votes')),
    blank: Yup.number().integer(t('integer_votes')).min(0, t('non_negative_votes')).max(600, t('max_votes_limit')).required(t('required_votes')),
    null: Yup.number().integer(t('integer_votes')).min(0, t('non_negative_votes')).max(600, t('max_votes_limit')).required(t('required_votes')),
    disputed: Yup.number().integer(t('integer_votes')).min(0, t('non_negative_votes')).max(600, t('max_votes_limit')).required(t('required_votes')),
    identity: Yup.number().integer(t('integer_votes')).min(0, t('non_negative_votes')).max(600, t('max_votes_limit')).required(t('required_votes')),
    command: Yup.number().integer(t('integer_votes')).min(0, t('non_negative_votes')).max(600, t('max_votes_limit')).required(t('required_votes')),
  });

const envelopesValidation = (t: (str: string, any?: any) => string) =>
  Yup.number()
    .integer(t('integer_envelopes'))
    .positive(t('positive_envelopes'))
    .max(600, t('max_votes_limit'))
    .required(t('required_envelopes'))
    .test('is-within-range', function (value) {
      const { electors } = this.parent; // Obtiene el valor de "electores" del mismo contexto
      const difference = Math.abs((electors || 0) - (value || 0));

      // El mensaje debe ser prural o singular dependiendo de la diferencia
      // Mensaje de ejemplo: Hay una diferencia de 5 sobres con respecto a los electores
      const message = t('difference_message_envelopes', {
        difference,
        oneormany: difference > 1 ? t('envelopes') : t('envelope'),
      });

      return difference <= 5 || this.createError({ path: 'validVotesDifference', message });
    });

const electorsValidation = (t: (str: string) => string) =>
  Yup.number().integer(t('integer_voters')).positive(t('positive_voters')).max(600, t('max_votes_limit')).required(t('required_voters'));

export const validationSchema = (t: (str: string) => string) =>
  Yup.object().shape({
    circuit: Yup.string().required(t('required_circuit')),
    table: Yup.string().required(t('required_table')),
    electors: electorsValidation(t),
    envelopes: envelopesValidation(t),
    votes: votesValidation(t),
    validTotalVotes: Yup.boolean().test('is-within-range', function () {
      const { envelopes, votes } = this.parent;
      const totalVotes = votes.lla + votes.uxp + votes.blank + votes.null + votes.disputed + votes.identity + votes.command;

      if (totalVotes > 600) {
        return this.createError({
          path: 'validTotalVotes',
          message: t('total_votes_limit'),
        });
      } else if (!(totalVotes === envelopes)) {
        return this.createError({
          path: 'validTotalVotes',
          message: t('sum_does_not_match'),
        });
      }

      return true;
    }),

    formAgreement: Yup.boolean().oneOf([true], t('accept_table_agreement')),
  });
