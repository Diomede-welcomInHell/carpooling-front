"use client";

import { notFound } from "next/navigation";
import { getTripById } from "@/lib/trip";
import { Trip } from "@/config/zodSchema";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Divider,
    Chip,
    Avatar,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Textarea,
} from "@heroui/react";
import Link from "next/link";
import { FaMapMarkerAlt, FaFlagCheckered, FaRoad, FaCar, FaUser, FaCalendarAlt, FaClock } from "react-icons/fa";

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function formatTime(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

// ─── Composant client pour les modales ──────────────────────────────────────

function TripActions({ trip }: { trip: Trip }) {
    const messageModal = useDisclosure();
    const reserveModal = useDisclosure();

    return (
        <>
            {/* ── Boutons fixés en bas ─────────────────────────── */}
            <div className="fixed bottom-0 left-0 right-0 z-10 bg-background border-t border-divider px-4 py-3 flex gap-2">
                <Button
                    as={Link}
                    href="/trips"
                    variant="bordered"
                    className="flex-1 text-foreground border-default-300"
                    size="md"
                >
                    ← Retour
                </Button>

                <Button
                    variant="flat"
                    color="primary"
                    className="flex-1"
                    size="md"
                    onPress={messageModal.onOpen}
                >
                    Message
                </Button>

                <Button
                    color="primary"
                    className="flex-1"
                    size="md"
                    isDisabled={trip.available_seats === 0}
                    onPress={reserveModal.onOpen}
                >
                    Réserver
                </Button>
            </div>

            {/* ── Modale Message ──────────────────────────────────── */}
            <Modal isOpen={messageModal.isOpen} onOpenChange={messageModal.onOpenChange} placement="bottom">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-foreground">
                                Envoyer un message
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-sm text-default-500 mb-2">
                                    À {trip.driver.firstname} {trip.driver.lastname}
                                </p>
                                <Textarea
                                    label="Votre message"
                                    placeholder="Bonjour, je suis intéressé par votre trajet..."
                                    minRows={4}
                                    variant="bordered"
                                    classNames={{
                                        label: "text-foreground",
                                        input: "text-foreground",
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose} className="text-foreground">
                                    Annuler
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Envoyer
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* ── Modale Réservation ──────────────────────────────── */}
            <Modal isOpen={reserveModal.isOpen} onOpenChange={reserveModal.onOpenChange} placement="bottom">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-foreground">Confirmer la réservation</ModalHeader>
                            <ModalBody>
                                <p className="text-sm text-default-600">
                                    Vous êtes sur le point de réserver une place sur le trajet :
                                </p>
                                <div className="flex items-center justify-center gap-3 my-3 font-semibold text-lg text-foreground">
                                    <span>{trip.starting_address.city_name}</span>
                                    <span className="text-default-400">→</span>
                                    <span>{trip.arrival_address.city_name}</span>
                                </div>
                                <p className="text-sm text-default-500 text-center">
                                    Le {formatDate(trip.trip_datetime)} à {formatTime(trip.trip_datetime)}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose} className="text-foreground">
                                    Annuler
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Confirmer
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

// ─── Page principale ─────────────────────────────────────────────────────────
// ⚠️ Ce fichier utilise "use client" car les modales nécessitent useDisclosure.
// Si tu veux garder la page en Server Component, extrais TripActions dans un
// fichier séparé (ex: TripActions.tsx) avec "use client" en haut.

export default async function TripsDetailPage({
                                                  params,
                                              }: {
    params: Promise<{ tripId: string }>;
}) {
    const { tripId } = await params;
    console.log("Vérification de l'idTrip récupéré 🆔" + tripId);
    const trip: Trip | null = await getTripById(Number(tripId));

    if (!trip) notFound();

    const initials = `${trip.driver.firstname[0]}${trip.driver.lastname[0]}`.toUpperCase();

    return (
        <div className="min-h-screen bg-default-50 pb-24">
            <div className="mx-auto max-w-md px-4 py-6 flex flex-col gap-4">

                {/* ── Card résumé ─────────────────────────────────── */}
                <Card className="shadow-md" radius="lg">
                    <CardHeader className="flex flex-col items-center gap-4 pt-6 pb-4 px-6">

                        {/* Départ → Arrivée */}
                        <div className="flex w-full items-center justify-between gap-2">
                            <div className="flex flex-col items-center flex-1">
                                <p className="text-xs text-default-500 uppercase tracking-widest mb-1">Départ</p>
                                <p className="text-xl font-bold text-foreground text-center">
                                    {trip.starting_address.city_name}
                                </p>
                            </div>

                            <span className="flex-shrink-0 text-default-300">
                                <svg viewBox="0 0 50 12" fill="none" className="w-12">
                                    <line x1="0" y1="6" x2="42" y2="6" stroke="currentColor" strokeWidth="1.5" />
                                    <polyline points="36,1 48,6 36,11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                            </span>

                            <div className="flex flex-col items-center flex-1">
                                <p className="text-xs text-default-500 uppercase tracking-widest mb-1">Arrivée</p>
                                <p className="text-xl font-bold text-foreground text-center">
                                    {trip.arrival_address.city_name}
                                </p>
                            </div>
                        </div>

                        <Divider />

                        {/* Date / Heure / Places */}
                        <div className="flex w-full justify-between items-start">
                            <div className="flex flex-col items-center gap-1 flex-1">
                                <FaCalendarAlt className="text-default-400 text-sm" />
                                <p className="text-xs text-default-500">Date</p>
                                <p className="text-xs font-medium text-foreground capitalize text-center">
                                    {formatDate(trip.trip_datetime)}
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-1 flex-1">
                                <FaClock className="text-primary text-sm" />
                                <p className="text-xs text-default-500">Heure</p>
                                <p className="text-lg font-bold text-primary">
                                    {formatTime(trip.trip_datetime)}
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-1 flex-1">
                                <span className="text-sm">🪑</span>
                                <p className="text-xs text-default-500">Places</p>
                                <Chip
                                    color={trip.available_seats > 0 ? "success" : "danger"}
                                    size="sm"
                                    variant="flat"
                                >
                                    {trip.available_seats > 0
                                        ? `${trip.available_seats} dispo`
                                        : "Complet"}
                                </Chip>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                {/* ── Card détail ─────────────────────────────────── */}
                <Card className="shadow-md" radius="lg">
                    <CardBody className="flex flex-col gap-4 px-5 py-5">
                        <p className="text-xs text-default-500 uppercase tracking-widest">Détail du trajet</p>

                        {/* Adresse départ */}
                        <div className="flex items-start gap-3">
                            <FaMapMarkerAlt className="text-primary mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-default-500">Adresse de départ</p>
                                <p className="text-sm font-medium text-foreground">
                                    {trip.starting_address.street_name}
                                </p>
                                <p className="text-xs text-default-500">
                                    {trip.starting_address.postal_code} {trip.starting_address.city_name}
                                </p>
                            </div>
                        </div>

                        <Divider />

                        {/* Adresse arrivée */}
                        <div className="flex items-start gap-3">
                            <FaFlagCheckered className="text-success mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-default-500">Adresse d'arrivée</p>
                                <p className="text-sm font-medium text-foreground">
                                    {trip.arrival_address.street_name}
                                </p>
                                <p className="text-xs text-default-500">
                                    {trip.arrival_address.postal_code} {trip.arrival_address.city_name}
                                </p>
                            </div>
                        </div>

                        <Divider />

                        {/* Distance */}
                        <div className="flex items-center gap-3">
                            <FaRoad className="text-default-400 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-default-500">Distance</p>
                                <p className="text-sm font-medium text-foreground">{trip.km} km</p>
                            </div>
                        </div>

                        <Divider />

                        {/* Véhicule */}
                        <div className="flex items-center gap-3">
                            <FaCar className="text-default-400 flex-shrink-0" />
                            <div>
                                <p className="text-xs text-default-500">Véhicule</p>
                                <p className="text-sm font-medium text-foreground">
                                    {trip.car.brand} {trip.car.model}
                                </p>
                            </div>
                        </div>

                        <Divider />

                        {/* Conducteur */}
                        <div className="flex items-center gap-3">
                            <FaUser className="text-default-400 flex-shrink-0" />
                            <div className="flex items-center gap-3">
                                <Avatar name={initials} size="sm" color="primary" />
                                <div>
                                    <p className="text-xs text-default-500">Conducteur</p>
                                    <p className="text-sm font-medium text-foreground">
                                        {trip.driver.firstname} {trip.driver.lastname}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

            </div>

            {/* ── Boutons + Modales ────────────────────────────────── */}
            <TripActions trip={trip} />
        </div>
    );
}
