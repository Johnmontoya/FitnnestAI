import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs"

const Footer = () => {

    return (
        <footer className="border-t border-gray-100/20 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-300">Productos</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Presentaciones</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Integraciones</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Precios</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Cambios</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-300">Recursos</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Communidad</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-300">Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white">Politicas de privacidad</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Terminos de Servicio</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-gray-300">Social</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><BsInstagram className="w-6 h-6" /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><BsTwitter className="w-6 h-6" /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><BsLinkedin className="w-6 h-6" /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <p className="text-gray-300">© 2026 FitTrack Pro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer