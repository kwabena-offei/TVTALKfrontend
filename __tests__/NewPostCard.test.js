import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NewPostCard from "../components/Chat/NewPostCard";

// Mock next/dynamic to avoid loading dynamic components
jest.mock("next/dynamic", () => () => () => null);

const mockPost = jest.fn();

jest.mock("../services/api", () => ({
  __esModule: true,
  default: () => ({ axios: { post: mockPost } })
}));

describe("NewPostCard", () => {
  test("posts comment and clears input", async () => {
    mockPost.mockResolvedValueOnce({ data: {} });

    render(<NewPostCard isMobile={false} profile={{}} show_id={1} />);

    const input = screen.getByPlaceholderText(/say something/i);
    fireEvent.change(input, { target: { value: "Hello" } });

    const button = screen.getByRole("button", { name: /post/i });
    fireEvent.click(button);

    await waitFor(() => expect(mockPost).toHaveBeenCalled());

    expect(mockPost).toHaveBeenCalledWith("/comments?tms_id=1", {
      comment: { text: "Hello", images: [], videos: [] }
    });

    await waitFor(() => expect(input.value).toBe(""));
  });
});
