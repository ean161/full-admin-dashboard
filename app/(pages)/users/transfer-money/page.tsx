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
import useTransferUserMoney from "@/hooks/users/UseTransferUserMoney";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectNative } from "@/components/ui/select-native";
import Header from "@/components/layout/users/Header";

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
            <div className="w-full md:w-1/3 mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Transfer money</CardTitle>
                        <CardDescription>
                            Transfer money between 2 users
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {userList === undefined && (
                            <div className="flex justify-center">
                                <Spinner />
                            </div>
                        )}
                        {userList !== undefined && (
                            <form
                                onSubmit={handleSubmit((data) =>
                                    setForm(JSON.stringify(data)),
                                )}
                                className="space-y-4"
                            >
                                <div className="flex space-x-2">
                                    <Field>
                                        <FieldLabel>Sender</FieldLabel>
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
                                    <Field className="w-1/3">
                                        <FieldLabel>Amount</FieldLabel>
                                        <Input
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
                                        <FieldLabel>Receiver</FieldLabel>
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
                                    className="w-fit"
                                >
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
