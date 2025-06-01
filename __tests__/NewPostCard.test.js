import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import NewPostCard from '../components/Chat/NewPostCard'
import useAxios from '../services/api'

jest.mock('../services/api')

describe('NewPostCard', () => {
  it('posts comment and clears input', async () => {
    const mockPost = jest.fn().mockResolvedValue({})
    useAxios.mockReturnValue({ axios: { post: mockPost } })

    render(<NewPostCard isMobile={false} profile={{}} show_id={1} />)

    const input = screen.getByPlaceholderText(/say something/i)
    fireEvent.change(input, { target: { value: 'Hello' } })

    const button = screen.getByRole('button', { name: /post/i })
    fireEvent.click(button)

    await waitFor(() => expect(mockPost).toHaveBeenCalled())
    expect(mockPost).toHaveBeenCalledWith('/comments?tms_id=1', {
      comment: { text: 'Hello', images: [], videos: [] }
    })
    expect(input.value).toBe('')
  })
})
