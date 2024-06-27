const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			
			getContacts: async () => {
				try {
					const res = await fetch("https://playground.4geeks.com/contact/agendas/huber0018/contacts")
					if (!res.ok) {
						console.log("Error", res.status)
					}
					const data = await res.json()
					console.log("Agenda", data)
					setStore({ contacts: data.contacts })

				} catch (error) {
					console.log(error)
				}
			},

			newContact: async (name, phone, email, address) => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/huber0018/contacts", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ "name": name, "phone": phone, "email": email, "address": address })
					})
					if (!response.ok) {
						console.log("No se creo contacto", response.status)
					}
					const data = await response.json()
					console.log("nuevo contact", data)
					getActions().getContacts()

				} catch (error) {
					console.log("Error creando contacto", error)
				}
			},

			deleteContact: async (id) => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/huber0018/contacts/" + id, {
						method: "DELETE",
					})
					if (!response.ok) {
						console.log("No se elimino contacto", response.status)
						return;
					}
					console.log("Contacto eliminado")
					getActions().getContacts()

				} catch (error) {
					console.log(error)
				}
			},

			MyUser: async () => {
				fetch("https://playground.4geeks.com/contact/agendas/huber0018")
					.then((response) => response.json())
					.then(data => {
						const userExist = data.agendas?.find(user => user.slug === "huber0018")
						if (!userExist) {
							fetch("https://playground.4geeks.com/contact/agendas/huber0018",
								{ method: 'POST' }
							)
								.then((response) => response.json())
								.then(console.log("Usuario Creado"))
								.then(() => getActions().getContacts())
						} else console.log("Usuario ya existente");
					})
			},


			editContact: async (name, phone, email, address, id) => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/huber0018/contacts/" + id, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ "name": name, "phone": phone, "email": email, "address": address })
					})
					if (!response.ok) {
						console.log("No se edito el contacto", response.status)
					}
					const data = await response.json()
					console.log(data)
					const store = getStore()
					const newAgenda = store.contacts.map(contact => contact.id === id ? data : contact)
					setStore({ contacts: newAgenda })

				} catch (error) {

				}
			}

		}
	};
};

export default getState;