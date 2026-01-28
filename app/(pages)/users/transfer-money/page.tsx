"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransferUserMoneySchema } from "@/modules/users/user.types";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectNative } from "@/components/ui/select-native";
import Header from "@/components/layout/users/Header";
import { ChevronsRight, UserRound } from "lucide-react";
import FormSkeleton from "./FormSkeleton";
import { Spinner } from "@/components/ui/spinner";
import useTransferUserMoney from "@/hooks/users/useTransferUserMoney";

export default function UserDetails() {
    const params = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(TransferUserMoneySchema),
    });

    const { isPending, userList, setForm } = useTransferUserMoney();

    return (
        <>
            <Header hasFullFeats={false} />
            <div className="xl:w-1/3 mx-auto">
                <Card className="border-dashed shadow-none">
                    <CardHeader>
                        <CardTitle>Transfer money</CardTitle>
                        <CardDescription>
                            Transfer money between 2 users
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {userList === undefined && <FormSkeleton />}
                        {userList !== undefined && (
                            <form
                                onSubmit={handleSubmit((data) =>
                                    setForm(JSON.stringify(data)),
                                )}
                                className="space-y-4 md:space-y-0"
                            >
                                <div className="md:flex space-x-4 space-y-4">
                                    <Field>
                                        <FieldLabel>
                                            <span className="flex space-x-1 items-center">
                                                <UserRound
                                                    size={16}
                                                    color="gray"
                                                />
                                                <span>Sender</span>
                                            </span>
                                        </FieldLabel>
                                        <SelectNative {...register("sender")}>
                                            {userList.map((u) => (
                                                <option key={u.id} value={u.id}>
                                                    {u.username} ({u.balance}$)
                                                </option>
                                            ))}
                                        </SelectNative>
                                        {errors.sender && (
                                            <FieldDescription className="text-red-500">
                                                {errors.sender.message}
                                            </FieldDescription>
                                        )}
                                    </Field>
                                    <Field className="md:w-1/3">
                                        <FieldLabel className="flex justify-center">
                                            <span className="block md:hidden">
                                                Amount
                                            </span>
                                            <ChevronsRight
                                                size={16}
                                                color="gray"
                                                className="hidden md:block"
                                            />
                                        </FieldLabel>
                                        <Input
                                            className="text-center"
                                            {...register("amount")}
                                            defaultValue={0}
                                        />
                                        {errors.amount && (
                                            <FieldDescription className="text-red-500">
                                                {errors.amount.message}
                                            </FieldDescription>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel className="w-full">
                                            <span className="ml-auto flex space-x-1 items-center">
                                                <span>Receiver</span>
                                                <UserRound
                                                    size={16}
                                                    color="gray"
                                                />
                                            </span>
                                        </FieldLabel>
                                        <SelectNative {...register("receiver")}>
                                            {userList.map((u) => (
                                                <option key={u.id} value={u.id}>
                                                    {u.username} ({u.balance}$)
                                                </option>
                                            ))}
                                        </SelectNative>
                                        {errors.receiver && (
                                            <FieldDescription className="text-red-500">
                                                {errors.receiver.message}
                                            </FieldDescription>
                                        )}
                                    </Field>
                                </div>
                                <Button
                                    type="submit"
                                    variant={"default"}
                                    disabled={isPending}
                                    className="w-fit cursor-pointer"
                                >
                                    {isPending && <Spinner />}
                                    Submit
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
