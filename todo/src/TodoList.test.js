import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

function addTodo(todoList, task = "write tests") {
  const taskInput = todoList.getByLabelText("Task:");
  fireEvent.change(taskInput, { target: { value: task }});
  const submitButton = todoList.getByText("Add a todo!");
  fireEvent.click(submitButton);
}

it("renders", function() {
  render(<TodoList />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

it("adds a todo", function() {
  const list = render(<TodoList />);
  addTodo(list);
  expect(list.getByLabelText("Task:")).toHaveValue("");
  expect(list.getByText("write tests")).toBeInTheDocument();
  expect(list.getByText("Edit")).toBeInTheDocument();
  expect(list.getByText("X")).toBeInTheDocument();
});

it("edits a todo", function() {
  const list = render(<TodoList />);
  addTodo(list);
  fireEvent.click(list.getByText("Edit"));
  const editInput = list.getByDisplayValue("write tests");
  fireEvent.change(editInput, { target: { value: "sleep" }});
  fireEvent.click(list.getByText("Update!"));
  expect(list.getByText("sleep")).toBeInTheDocument();
  expect(list.queryByText("write tests")).not.toBeInTheDocument();
});

it("deletes a todo", function() {
  const list = render(<TodoList />);
  addTodo(list);
  fireEvent.click(list.getByText("X"));
  expect(list.queryByText("write tests")).not.toBeInTheDocument();
});
