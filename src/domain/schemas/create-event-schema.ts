import * as yup from "yup";

export const CreateEventeValidator = yup.object().shape({
  event: yup
    .object()
    .shape({
      name: yup.string().typeError("O nome do evento precisa ser uma string.").required("O nome do evento precisa ser informado"),
      description: yup.string(),
      type: yup.string().required("O tipo de evento deve ser informado."),
      place: yup.string().typeError("O local do evento precisa ser uma string.").required("O local do evento deve ser informado."),
      owner: yup.string().required("O dono do evento precisa ser informado"),
      ticket_quantity: yup.number().required("A quantidade de ingressos disponivel deve ser informado."),
      event_config: yup.object().required("As configurações do evento precisa ser informadas."),
    })
    .required("É necessário informar os parametros para concluir o cadastro do evento."),
});
