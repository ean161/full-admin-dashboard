"use client";

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
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useUserDetails from "@/hooks/users/useUserDetails";
import { useParams } from "next/navigation";

export default function UserDetails() {
    const params = useParams();

    const { user } = useUserDetails({
        id: String(params.id),
    });

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        User management
                    </h2>
                    <p className="text-muted-foreground">
                        Create, update, delete users
                    </p>
                </div>
            </div>
            <div className="w-full md:w-1/3 mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>User details</CardTitle>
                        <CardDescription>ID: #{params.id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user === undefined && (
                            <div className="flex justify-center">
                                <Spinner />
                            </div>
                        )}
                        {user !== undefined && (
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>ID</FieldLabel>
                                    <FieldContent>
                                        <Input
                                            defaultValue={user?.id ?? ""}
                                            readOnly
                                        />
                                    </FieldContent>
                                </Field>
                                <Field>
                                    <FieldLabel>Username</FieldLabel>
                                    <FieldContent>
                                        <Input
                                            defaultValue={user?.username ?? ""}
                                            readOnly
                                        />
                                    </FieldContent>
                                </Field>
                                <Field>
                                    <FieldLabel>Balance</FieldLabel>
                                    <FieldContent>
                                        <Input
                                            defaultValue={user?.balance ?? "0"}
                                            readOnly
                                        />
                                    </FieldContent>
                                </Field>
                            </FieldGroup>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
