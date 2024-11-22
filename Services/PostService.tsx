export interface payload {
    titulo: string;
    descricao: string;
    conteudo: string;
    imagem?: string | null;
  }

  export const createPost = async (payload: any, token: string): Promise<void> => {
    const response = await fetch("http://10.0.2.2:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error("Erro ao criar post.");
    }
  };
  
  export const updatePost = async (payload: any, id: number, token: string): Promise<void> => {
    const response = await fetch(`http://10.0.2.2:3000/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error("Erro ao atualizar post.");
    }
  };
  
  export const getPostById = async (id: number): Promise<any> => {
    const response = await fetch(`http://10.0.2.2:3000/api/posts/${id}`, {
        method: "GET",
    });
  
    if (!response.ok) {
      throw new Error("Erro ao buscar post.");
    }
  
    return response.json();
  };
  
