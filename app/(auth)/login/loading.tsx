import {Spinner} from "@heroui/react";

export default function LoginLoadingPage() {
    return <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <span className="text-xs text-muted">Connexion...</span>
    </div>
}