"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { login } from "@/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters." })
    .max(50, { message: "Username must be lower than 50 characters." }),
  password: z
    .string()
    .min(3, { message: "Password must be atleast 3 characters." })
    .max(50, { message: "Password must be lower than 50 characters." }),
});

export const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "", password: "" },
  });

  const [isPending, setIsPending] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitCount((prevState) => prevState + 1);
    setIsPending(true);

    const res = await login(values);

    if (res) {
      toast("Success!", {
        description: "Logged in succesfully...",
      });
    } else {
      toast("Login failed!", {
        description: `Invalid credentials... ${submitCount > 30 ? "Do I have to configure rate limiter??" : submitCount > 20 ? "Please stop" : submitCount > 10 ? "Chill maybe" : ""}`,
      });
    }

    setIsPending(false);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-max w-[300px] flex-col gap-4 rounded-md border border-border p-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Unique username" {...field} />
                </FormControl>
                <FormDescription>
                  Please enter username or guess it.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Complex password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please enter password or guess it.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};
