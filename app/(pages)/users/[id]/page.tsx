"use client";

import Header from "@/components/layout/users/Header";
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
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import useUserDetails from "@/hooks/users/useUserDetails";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function UserDetails() {
    const params = useParams();

    const { user } = useUserDetails({
        id: String(params.id),
    });

    return (
        <>
            <Header hasFullFeats={false} />
            <div className="xl:w-1/3 mx-auto">
                <Card className="border-dashed shadow-none">
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
                                <Field>
                                    <FieldContent>
                                        <Link href={`/users/${user?.id}/edit`}>
                                            <Button
                                                type="submit"
                                                variant={"secondary"}
                                                className="w-fit"
                                            >
                                                Edit
                                            </Button>
                                        </Link>
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
