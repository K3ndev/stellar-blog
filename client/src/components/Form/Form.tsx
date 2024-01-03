import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRef } from "react"
import { BLOGS_QUERY, CREATE_BLOG } from "../../schema/index"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
    rating: z.string().regex(/^[1-9]|10$/, {
        message: "Rating must be between 1 and 10.",
    }),
});

export function InputForm() {


    const titleRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLInputElement>(null);
    const ratingRef = useRef<HTMLInputElement>(null);


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            message: "",
            rating: "0",
        },
    })

    const { } = useQuery(BLOGS_QUERY);
    const [
        createBlog,
    ] = useMutation(CREATE_BLOG);


    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });

        try {
            const response = await createBlog({
                variables: {
                    title: titleRef.current!.value,
                    body: messageRef.current!.value,
                    rating: +ratingRef.current!.value,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
                refetchQueries: [{ query: BLOGS_QUERY }],
            });

            titleRef.current!.value = "";
            messageRef.current!.value = "";
            ratingRef.current!.value = "";

            form.reset({
                title: "",
                message: "",
                rating: "0",
            });

        } catch (_) {
            console.log('error');
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} className="text-black" ref={titleRef} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Body Message</FormLabel>
                            <FormControl>
                                <Input placeholder="Message" {...field} className="text-black" ref={messageRef} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Rating" {...field} className="text-black" min={1} max={10} ref={ratingRef} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}