"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema } from "@/modules/users/user.types";
import useCreateUser from "@/hooks/users/useCreateUser";
import Header from "@/components/layout/users/Header";
import { Spinner } from "@/components/ui/spinner";
import { ButtonGroup } from "@/components/ui/button-group";
import { Dices } from "lucide-react";
import { rand } from "@/lib/utils";

export default function UserDetails() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(CreateUserSchema),
    });

    const { createMutation } = useCreateUser();

    const generateUsername = () => {
        setValue("username", `user${rand(111111, 999999)}`);
    };

    return (
        <>
            <Header hasFullFeats={false} />
            <div className="xl:w-1/3 mx-auto">
                <Card className="border-dashed shadow-none">
                    <CardHeader>
                        <CardTitle>Create user</CardTitle>
                        <CardDescription>Create new user</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit((data) =>
                                createMutation.mutate({
                                    form: JSON.stringify(data),
                                }),
                            )}
                        >
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Username</FieldLabel>
                                    <ButtonGroup>
                                        <Input
                                            {...register("username")}
                                            placeholder="Enter username"
                                        />
                                        <Button
                                            onClick={generateUsername}
                                            type="button"
                                            variant="outline"
                                            aria-label="Search"
                                        >
                                            <Dices />
                                        </Button>
                                    </ButtonGroup>
                                    {errors.username && (
                                        <FieldDescription className="text-red-500">
                                            {errors.username.message}
                                        </FieldDescription>
                                    )}
                                </Field>
                                <Field>
                                    <FieldLabel>Balance</FieldLabel>
                                    <FieldContent>
                                        <Input
                                            {...register("balance")}
                                            placeholder="Enter amount"
                                            defaultValue={0}
                                        />
                                    </FieldContent>
                                    {errors.balance && (
                                        <FieldDescription className="text-red-500">
                                            {errors.balance.message}
                                        </FieldDescription>
                                    )}
                                </Field>
                                <Field>
                                    <FieldContent>
                                        <Button
                                            type="submit"
                                            variant={"default"}
                                            disabled={createMutation.isPending}
                                            className="w-fit cursor-pointer"
                                        >
                                            {createMutation.isPending && (
                                                <Spinner />
                                            )}
                                            Submit
                                        </Button>
                                    </FieldContent>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
