import { FormEvent, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from 'react-toastify';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAddTodoMutation } from "@/redux/api/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const AddTodoDialog = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission
  const [isFromValidation, setIsFromValidation] = useState(false); // State to track form validation

  const [addTodo] = useAddTodoMutation();

  useEffect(() => {
    // Check if all fields are filled  validation
    if (task && description && priority) {
      setIsFromValidation(true);
    } else {
      setIsFromValidation(false);
    }
  }, [task, description, priority]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const taskDetails = {
      title: task,
      isCompleted: false,
      description,
      priority,
    };

    try {
      await addTodo(taskDetails);
      setIsSubmitted(true); // Set submission flag to true on successful submission
      toast.success("Thank you dear for writing your history 🥰🥰 !!!", {
        position: "top-right"
      });

    } catch (error) {
      console.error("Error submitting form:", error);
    }

    // Clear fields after submission 
    setTask("");
    setDescription("");
    setPriority("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-gradient text-xl font-semibold fixed bottom-4 right-4 md:relative md:bottom-auto md:right-auto">
          History Create Now
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg mx-auto p-4 sm:p-6 md:p-8">
        <DialogHeader>
          <DialogTitle>History Add Now</DialogTitle>
          <DialogDescription>Express your feelings</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right sm:col-span-1">
                Name:
              </Label>
              <Input
                onChange={(e) => setTask(e.target.value)}
                id="name"
                className="col-span-3 sm:col-span-3 border border-green-500 outline-none p-2"
                required
                placeholder="Your Name ..."
                value={task}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label
                htmlFor="description"
                className="text-right sm:col-span-1"
              >
                Description:
              </Label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                className="col-span-3 sm:col-span-3 w-full border border-green-500 p-2"
                required
                placeholder="Type here ..."
                value={description}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label className="text-right sm:col-span-1">Priority:</Label>
              <Select
                onValueChange={(value) => setPriority(value)}
                required
                value={priority}
              >
                <SelectTrigger className="col-span-3 sm:col-span-3 border border-green-500">
                  <SelectValue placeholder="Select a Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>What is Priority</SelectLabel>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" disabled={!isFromValidation}>
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
        {isSubmitted && (
          <p className="text-center text-green-500 mt-4">Thank you dear!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;
