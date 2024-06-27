const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {

			getContacts: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/huber0018/contacts")
					if (!response.ok) {
						console.log("No hay contactos!", response.status)
					}
					const data = await response.json()
					console.log("Esta es la Agenda", data)
					setStore({ contacts: data.contacts })

				} catch (error) {
					console.log(error)
				}
			},

			findOutMyUser: () => {
				fetch("https://playground.4geeks.com/contact/agendas/AdriCabrera")
					.then((response) => response.json())
					.then(data => {
						const userExist = data.agendas?.find(user => user.slug === "AdriCabrera")
						if (!userExist) {
							fetch("https://playground.4geeks.com/contact/agendas/AdriCabrera",
								{ method: 'POST' }
							)
								.then((response) => response.json())
								.then(console.log("Usuario Creado"))
								.then(() => getActions().getContacts())
						} else console.log("El usuario ya existe");
					})
			},

			newContact: async (name, phone, email, address) => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/AdriCabrera/contacts", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							"name": name,
							"phone": phone,
							"email": email,
							"address": address
						})
					})
					if (!response.ok) {
						console.log("No se pudo crear contacto", response.status)
					}
					const data = await response.json()
					console.log("Contacto creado", data)
					getActions().getContacts()

				} catch (error) {
					console.log("Error creando contacto", error)
				}
			},

			deleteContact: async (id) => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/AdriCabrera/contacts/" + id, {
						method: "DELETE",
					})
					if (!response.ok) {
						console.log("No se pudo eliminar contacto", response.status)
						return;
					}
					console.log("Contacto eliminado")
					getActions().getContacts()

				} catch (error) {
					console.log(error)
				}
			},

			editContact: async (name, phone, email, address, id) => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/AdriCabrera/contacts/" + id, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							"name": name,
							"phone": phone,
							"email": email,
							"address": address
						})
					})
					if (!response.ok) {
						console.log("No se puede editar el contacto", response.status)
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