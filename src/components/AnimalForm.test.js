import {render, screen, waitFor} from "@testing-library/react";
import AnimalForm from './AnimalForm'
import React from 'react';
import userEvent from "@testing-library/user-event"

test("Renders without errors", () => {
    render(<AnimalForm />);
})

test("when user fills all fields and submits, species appears in list", async () => {
    //arrange
    render(<AnimalForm/>)
    const species = 'feline';
    //act
    const speciesInput = screen.getByLabelText(/species/i);
    userEvent.type(speciesInput, species);

    const ageInput = screen.getByLabelText(/age/i);
    userEvent.type(ageInput, '9');

    const noteInput = screen.getByLabelText(/notes/i);
    userEvent.type(noteInput, "whatever I want");

    const submitBtn = screen.getByRole('button');
    userEvent.click(submitBtn);
    //assert
    await waitFor(() => {
    const speciesFeedback = screen.queryByText(species);
    expect(speciesFeedback).toBeInTheDocument();
    })
})