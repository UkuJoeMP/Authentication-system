const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: localStorage.getItem("token") || null,
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try{
					const BACKEND_URL = process.env.REACT_APP_BACKEND_URL|| "https://miniature-space-winner-5g4wggp64p9p2ppg-3001.app.github.dev/api"
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			// Register new user
			register: async (user) => {
				try {
					let response = await fetch(`${process.env.BACKEND_URL}/register`, {
						method: "POST",
						headers: { 
							"Content-Type": "application/json" 
						},
						body: JSON.stringify(user),
					}
				)
					return response.status
				} catch (error) {
					console.error("Error in register:", error);
					return false;
				}
			},

			// Login user
			login: async (user) => {
				try {
					console.log("LOGIN REQUEST:", user);
					let response = await fetch(`${process.env.BACKEND_URL}/login`, {
						method: "POST",
						headers: { 
							"Content-Type": "application/json" 
						},
						body: JSON.stringify(user),
					}
				)
					let data = await response.json();
					console.log("LOGIN RESPONSE:", response.status, data);
					if (!response.ok){
					setStore({ 
						token: data.token 
					})
						localStorage.setItem("token", data.token)}
					return { status: response.status, data };
				} catch (error) {
					console.error("Error in login:", error);
					return false
				}
			},

			// Logout user
			logout: () => {
				localStorage.removeItem("token");
				setStore({ token: null });
			}
		}
	};
};

export default getState;