import * as yup from "yup";


export const EventPurchaseValidator = yup.object().shape({
    event: yup.object().shape({
        eventId: yup
            .number()
            .integer()
            .typeError('O localizador do evento deve ser um número.')
            .required('O localizador do evento deve ser enviado.'),
        ownerName: yup
            .string()
            .typeError('O nome do comprador dever ser uma string.')
            .required('O nome do comprador deve ser enviado.'),
        contact: yup.object().shape({
            phoneNumber: yup.string().required('É necessário informar o contato do comprador.'),
            email: yup.string().email('Envie um email válido.')
        }),
    })
});