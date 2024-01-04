import { z } from 'zod'

export const productInsertSchema = z.object({
    name            : z.string({
                            required_error        : "Name tidak boleh kosong",
                            invalid_type_error    : "Name harus berupa string",
                        }).min(1),
    description     : z.string({
                            required_error        : "description tidak boleh kosong",
                            invalid_type_error    : "description harus berupa string",
                        }).min(1),
    image           : z.string({
                            required_error        : "image tidak boleh kosong",
                            invalid_type_error    : "image harus berupa string",
                        }).min(1),
    price           : z.number({
                            required_error        : "price tidak boleh kosong",
                            invalid_type_error    : "Name harus berupa string",
                        }).min(1),
})


export type ProductPayload = z.infer<typeof productInsertSchema>;